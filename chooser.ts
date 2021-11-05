import axios from "axios";
import { trendingPlayersInterface, allPlayersInterface } from "./interfaces";

class chooser {

    // Position -> Choosed players position
    // Count -> Count of players that'll be choosed

    public async choose(position: string, count: number) {

        var trending_players_request = (await axios.get<Array<trendingPlayersInterface>>("https://api.cartolafc.globo.com/mercado/destaques")).data;
        var all_players_request = (await axios.get<allPlayersInterface>("https://api.cartolafc.globo.com/atletas/mercado")).data;

        console.log(`Finding ${count} players that play as ${position}`)

        // PLayers -> Array (Best players founded)
        var players = [];

        // Run the searching query giving priority to the trending players, but, if those players aren't enough, change the search target to all available players
        for(var a = 0; a < all_players_request.atletas.length; a++) {
            while(players.length < count) {
                while(players.length < count && a <= trending_players_request.length) {
                    for(var t = 0; t < trending_players_request.length; t++) {
                        var player = trending_players_request[t];
                        var player_info;
    
                        all_players_request.atletas.forEach(p => {
                            if(p.atleta_id === player.Atleta.atleta_id) player_info = p
                        });
    
                        if(player_info.status_id != "7") continue;
                        else {
                            if(player_info.posicao_id != position) continue;
                            else {
                                players.push(player_info);
                            }
                        }
                    }
                }
            }

            while(players.length < count && a > trending_players_request.length) {
                console.log("Trending players wasn't enough, searcing on all players")
                var a_player = all_players_request.atletas[a];
                var player_info;

                all_players_request.atletas.forEach(p => {
                    if(p.atleta_id === a_player.atleta_id) player_info = p
                });

                if(player_info.status_id != "7") continue;
                else {
                    if(player_info.posicao_id != position) continue;
                    else {
                        players.push(player_info);
                    }
                }
            }
        }
        
        return players; // Return the best players generated list.
    }
}

export default new chooser();