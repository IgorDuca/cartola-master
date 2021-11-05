import { responsePlayerInterface, clubInterface } from "./interfaces";
import axios from "axios";

class formatter {
    public async format(players: Array<responsePlayerInterface>) {
        var formatted = [];

        var fetched_clubs = (await axios.get<Array<clubInterface>>("https://api.cartolafc.globo.com/clubes")).data;

        // Returning a response with player id, player name, player club id and the player club name
        for(var i = 0; i < players.length; i++) {
            var club_name: string = fetched_clubs[players[i].clube_id].nome;

            var form = {
                id: players[i].atleta_id,
                name: players[i].apelido,
                club_id: players[i].clube_id,
                club_name: club_name,
                position: players[i].posicao_id
            };

            console.log(form);
            formatted.push(form);
        };

        return formatted;
    };
}

export default new formatter();