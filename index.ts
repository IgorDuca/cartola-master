import axios from "axios";
const express = require("express");
const cors = require("cors");
import { Request, Response } from "express";

// Importing type modules
import { marketStatusInterface, schemasInterface } from "./interfaces";

// Importing choose algorithm
import chooser from './chooser';

// Importing response formatter
import formatter from "./formatter";

// Importing helper module -> Removes unecessary players
import helper from "./helper"

var app = express();
app.use(cors());
app.listen(1239, () => {
    console.log(`http://localhost:${1239}`)
});

app.get("/api/getscale/:schema", async (req: Request, res: Response) => {

    // Defining http request and their datas matching to each interface model
    var market_status_request = (await axios.get<marketStatusInterface>("https://api.cartolafc.globo.com/mercado/status")).data;
    var schemas_request = (await axios.get<Array<schemasInterface>>("https://api.cartolafc.globo.com/esquemas")).data;

    console.log(`Creating scale matching to schema ${req.params.schema}`);

    // Status = 1 -> Market closed
    // Status = 2 -> Market open
    if(market_status_request.status_mercado == 1) {
        var schema_pcount = {
            ata: 0,
            gol: 0,
            mei: 0,
            lat: 0,
            zag: 0,
            tec: 0,
            total: 0
        };

        for(var r = 0; r < schemas_request.length; r++) {
            if(schemas_request[r].esquema_id === parseInt(req.params.schema)) {
                schema_pcount = {
                    ata: schemas_request[r].posicoes.ata,
                    gol: schemas_request[r].posicoes.gol,
                    mei: schemas_request[r].posicoes.mei,
                    lat: schemas_request[r].posicoes.lat,
                    zag: schemas_request[r].posicoes.zag,
                    tec: schemas_request[r].posicoes.tec,
                    total: schemas_request[r].posicoes.ata + schemas_request[r].posicoes.gol + schemas_request[r].posicoes.mei + schemas_request[r].posicoes.lat + schemas_request[r].posicoes.zag + schemas_request[r].posicoes.tec
                }
            }
        };

        // Choosing the schema's needed players
        var goalkeepers    =     await chooser.choose("1", schema_pcount.ata);
        var laterals       =     await chooser.choose("2", schema_pcount.lat);
        var deffenders     =     await chooser.choose("3", schema_pcount.zag);
        var middles        =     await chooser.choose("4", schema_pcount.mei);
        var attackers      =     await chooser.choose("5", schema_pcount.ata);
        var techs          =     await chooser.choose("6", schema_pcount.tec);

        var allplayers = []; // Array where will be stored all the fetched players

        // Adding each selected player to all player's array
        for(var g = 0; g < goalkeepers.length; g++) allplayers.push(goalkeepers[g]);
        for(var l = 0; l < laterals.length; l++) allplayers.push(laterals[l]);
        for(var d = 0; d < deffenders.length; d++) allplayers.push(deffenders[d]);
        for(var m = 0; m < middles.length; m++) allplayers.push(middles[m]);
        for(var a = 0; a < attackers.length; a++) allplayers.push(attackers[a]);
        for(var t = 0; t < techs.length; t++) allplayers.push(techs[t]);


        var formatedResponse = await formatter.format(allplayers);

        console.log(`Finding a total of ${schema_pcount.total} players`);
        console.log(`Got a total of ${formatedResponse.length}`);

        if(formatedResponse.length > schema_pcount.total) {
            // Removing the unecessary players of each position
            var gol = await helper.removeUnecessary(goalkeepers, schema_pcount.gol);
            var lat = await helper.removeUnecessary(laterals, schema_pcount.lat);
            var def = await helper.removeUnecessary(deffenders, schema_pcount.zag);
            var mid = await helper.removeUnecessary(middles, schema_pcount.mei);
            var ata = await helper.removeUnecessary(attackers, schema_pcount.ata);
            var tec = await helper.removeUnecessary(techs, schema_pcount.tec);

            gol = (await formatter.format(gol));
            lat = (await formatter.format(lat));
            def = (await formatter.format(def));
            mid = (await formatter.format(mid));
            ata = (await formatter.format(ata));
            tec = (await formatter.format(tec));

            var finalist = [];

            gol.forEach(g => { finalist.push(g) });
            lat.forEach(l => { finalist.push(l) });
            def.forEach(d => { finalist.push(d) });
            mid.forEach(m => { finalist.push(m) });
            ata.forEach(a => { finalist.push(a) });
            tec.forEach(t => { finalist.push(t) });

            var cap = await chooser.chooseCaptain(finalist); // The recieved capitain player from the chooseCapitain() function -> See more on the file: choose.ts.

            var allprice = Math.round(helper.getFinalPriceSum(allplayers)); // Gets the sum of all players price. Recieving a number from the file: helper.ts

            console.log(`FINAL PRICE: ${allprice}`);

            return res.status(200).json({ price: allprice, gol, lat, def, mid, ata, tec, cap });
        } else return res.status(200).json(formatedResponse);
    } else return res.status(500).json({ success: false, message: "Market is closed" });
});