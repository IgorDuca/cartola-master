import { formattedPlayerInterface, allPlayersInterface, responsePlayerInterface } from "./interfaces";
import axios from "axios";

class helper {
    public async removeUnecessary(players: Array<formattedPlayerInterface>, count: number) {
        // players.length -> total
        // count -> expected

        if(players.length > players.length - count) {
            var final_players = []; // List that will store the final players

            for(var i = 0; i < count; i++) final_players.push(players[i]); // Pushing the expected players to the list
            
            console.log(`Got: ${players.length}, expected: ${count} -> Removing ${players.length - count}`);

            console.log(final_players);
            
            return final_players;
        } else console.log(`Expected: ${count}, got ${count} -> Ignoring`)
    };

    public getFinalPriceSum(players: Array<responsePlayerInterface>) {

        var price = 0; // Final price sum.

        for(var i = 0; i < players.length; i++) {
            price += players[i].preco_num;
        };

        return price; // Returns the final price
    };
}

export default new helper();