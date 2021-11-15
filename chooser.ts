import axios from "axios";
import { trendingPlayersInterface, allPlayersInterface, formattedPlayerInterface } from "./interfaces";

class chooser {

    // Position -> Choosed players position
    // Count -> Count of players that'll be choosed

    public async choose(position: string, count: number) {

        var trending_players_request = (await axios.get<Array<trendingPlayersInterface>>("https://api.cartolafc.globo.com/mercado/destaques")).data;
        var all_players_request = (await axios.get<allPlayersInterface>("https://api.cartolafc.globo.com/atletas/mercado")).data;

        console.log(`Finding ${count} players that play as ${position}`)

        // PLayers -> Array (Best players founded)
        var players = []; // Array where will be stored all the fetched players.

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

    public async chooseCaptain(players: Array<formattedPlayerInterface>) {
        var major_rating = []; // The player with major rating will be here.

        // Rating formula: points * price / all games

        var all_players_request = (await axios.get<allPlayersInterface>("https://api.cartolafc.globo.com/atletas/mercado")).data;

        var i = 0;
        while(i < players.length) {
            all_players_request.atletas.forEach(p => {
                if(p.atleta_id === parseInt(players[i].id)) {
                    if(p.posicao_id === 6) return;
                    else {
                        var rating = p.pontos_num * p.preco_num;
                        rating = rating / p.jogos_num;
                        rating = Math.round(rating);

                        console.log(`Rating: ${rating}`);
                        console.log(major_rating);

                        // Checks if next player has a rating greater than the last, if it is true, the previous player'll be replaced by the new one.

                        if(major_rating.length === 0) {
                            major_rating.push({ id: p.atleta_id, player_rating: rating, allgames: p.jogos_num, points: p.pontos_num });
                        } else if(rating > major_rating[0].player_rating) {
                            major_rating = [];
                            major_rating.push({ id: p.atleta_id, player_rating: rating, allgames: p.jogos_num, points: p.pontos_num });
                        };
                    }
                };
            });

            i++;
        };

        for(var i = 0; i < all_players_request.atletas.length; i++) {
            if(all_players_request.atletas[i].atleta_id === major_rating[0].id) {
                major_rating[0].points = Math.round(major_rating[0].points); //Rounding player points.
                var percentage = Math.round(major_rating[0].player_rating * major_rating[0].points / major_rating[0].allgames);
                // Calculates the probability to the player go and score a good amount of match points.
                // Calculated using probability, multiplying the player rating by it points and then dividing by all the games played by the player.

                major_rating = [];
                major_rating.push({
                    id: all_players_request.atletas[i].atleta_id,
                    name: all_players_request.atletas[i].nome,
                    club_id: all_players_request.atletas[i].clube_id,
                    position: all_players_request.atletas[i].posicao_id,
                    cap: true,
                    percentage: `${percentage}%`
                }); // Returning the captain player object
            };
        };

        return major_rating[0];
    };
}

export default new chooser();