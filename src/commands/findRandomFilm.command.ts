import axios from "axios";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
import { Telegraf, NarrowedContext, Input } from "telegraf"
import { Film } from "../models/Film.model";
import { Update, Message } from "telegraf/typings/core/types/typegram";
import { MAX_FILMS } from "../consts";
import { URLS } from "../api/urls.api";

export class FindRandomFilm extends Command {


    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {
        this.bot.command("findrandom", (ctx) => {
            this.getFilm(ctx)
        })

    }

    private getRandomNum(max: number): number {
        return Math.floor(Math.random() * max) + 2
    }



    private getGenres(genres: any[]): string {
        const genre: any[] = [];
        genres.forEach((val) => {
            genre.push(val.name)
        })

        let result = "Genres:\n"
        genre.forEach((val) => {
            result = result.concat("- " + val + "\n")
        })

        return result

    }

    private async getFilm(ctx: NarrowedContext<IBotContext, { message: Update.New & Update.NonChannel & Message.TextMessage; update_id: number; }>) {
        try {
            const data = await axios.get<Film>(`${URLS.MAIN_URL}/movie/${this.getRandomNum(MAX_FILMS)}?api_key=${process.env.API_KEY}`)
            const imageURL: string = `${URLS.IMAGE_URL}`.concat(data.data.poster_path)

            const image = Input.fromURLStream(imageURL)
            const genres = this.getGenres(data.data.genres)
            const text = data.data.original_title + `\nRelease date:${data.data.release_date}` + "\n\n" + genres + "\n" + (data.data.overview == null || undefined ? "No Overview" : data.data.overview) + "\n\n" + String("Rating:" + data.data.vote_average);
            await ctx.replyWithPhoto(image, {
                caption: text
            })
        } catch (error) {
            this.getFilm(ctx)
        }
    }

}