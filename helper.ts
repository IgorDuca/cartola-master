import { formattedPlayerInterface } from "./interfaces";

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
    }
}

export default new helper();