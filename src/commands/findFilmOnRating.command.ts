import { Context, Input, Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
import axios from "axios";
import { URLS } from "../api/urls.api";


export class FindFilmOnRating extends Command {
    private minRating = 0;
    private maxRating = 9;

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

    private getRandomNum(max: number): number {
        return Math.floor(Math.random() * max)
    }


    private checkGenre(genres: any, idGenre: any) {
        return genres.includes(idGenre)
    }

    private async getFilm(ctx: any) {
        try {
            const data = await axios.get(`${URLS.DISCOVER_URl}?api_key=${process.env.API_KEY}&vote_average.gte=${this.minRating}&vote_average.lte=${this.maxRating}&page=${this.getRandomNum(100)}`)
            const result = data.data.results

            const film = result[this.getRandomNum(19)]

            const imageURL: string = `${URLS.IMAGE_URL}`.concat(film.poster_path)
            const image = Input.fromURLStream(imageURL)
            const genres = await axios.get(`${URLS.GENRE_URL}?api_key=${process.env.API_KEY}&language=en-US`)

            const array_genres: any[] = genres.data.genres.filter((val: any) => { return film.genre_ids.includes(val.id) })
            const res_genres = this.getGenres(array_genres)
            const text = film.original_title + `\nRelease date:${film.release_date}` + "\n\n" + res_genres + "\n" + (film.overview == null || undefined ? "No Overview" : film.overview) + "\n\n" + String("Rating:" + film.vote_average);
            await ctx.replyWithPhoto(image, {
                caption: text,
                parse_mode: "Markdown",
                ...Markup.inlineKeyboard([
                    Markup.button.callback("Get another", "findrandomrate"),
                ])
            })
        } catch (error) {

            this.getFilm(ctx)
        }
    }

    handle(): void {
        this.bot.command("setrating", (ctx: Context) => {
            ctx.reply("Enter minimum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_minimun")))
        })


        this.bot.action("press_minimun1", async (ctx) => {
            this.minRating = 1

            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))
        })


        this.bot.action("press_minimun2", async (ctx) => {
            this.minRating = 2
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun3", async (ctx) => {
            this.minRating = 3
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun4", async (ctx) => {
            this.minRating = 4
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun5", async (ctx) => {
            this.minRating = 5
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun6", async (ctx) => {
            this.minRating = 6
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun7", async (ctx) => {
            this.minRating = 7
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun8", async (ctx) => {
            this.minRating = 8
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun9", async (ctx) => {
            this.minRating = 9
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        this.bot.action("press_minimun0", async (ctx) => {
            this.minRating = 0
            ctx.reply("Enter maximum rating", Markup.inlineKeyboard(this.getInlineKeyboard("press_maximum")))

        })

        // ---------------------
        // ---------------------
        // ---------------------
        // ---------------------

        this.bot.action("press_maximum1", async (ctx) => {
            this.maxRating = 1
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum2", async (ctx) => {
            this.maxRating = 2
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum3", async (ctx) => {
            this.maxRating = 3
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum4", async (ctx) => {
            this.maxRating = 4
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum5", async (ctx) => {
            this.maxRating = 5
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum6", async (ctx) => {
            this.maxRating = 6
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum7", async (ctx) => {
            this.maxRating = 7
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum8", async (ctx) => {
            this.maxRating = 8
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum9", async (ctx) => {
            this.maxRating = 9
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("press_maximum0", async (ctx) => {
            this.maxRating = 0
            if (this.maxRating < this.minRating) {
                const tmp = this.maxRating
                this.maxRating = this.minRating
                this.minRating = tmp
            }
            ctx.reply("Press to Find Random Film", Markup.inlineKeyboard([Markup.button.callback("Press", "findrandomrate")]))
        })

        this.bot.action("findrandomrate", ctx => {
            this.getFilm(ctx)
        })


        this.bot.command("findfilmbyrating", ctx => {
            this.getFilm(ctx)
        })

    }


    private getInlineKeyboard(MinMax: string) {
        return [
            [Markup.button.callback("1", MinMax.concat("1")), Markup.button.callback("2", MinMax.concat("2")), Markup.button.callback("3", MinMax.concat("3"))],
            [Markup.button.callback("4", MinMax.concat("4")), Markup.button.callback("5", MinMax.concat("5")), Markup.button.callback("6", MinMax.concat("6"))],
            [Markup.button.callback("7", MinMax.concat("7")), Markup.button.callback("8", MinMax.concat("8")), Markup.button.callback("9", MinMax.concat("9"))],
            [Markup.button.callback("0", MinMax.concat("0"))]
        ]

    }


    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }
}