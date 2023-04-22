import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
import { Telegraf, Markup } from "telegraf"

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {
        this.bot.start((ctx) => {
            console.log(ctx.session)
            ctx.reply("is like?", Markup.inlineKeyboard([
                Markup.button.callback("Like", "course_like"),
                Markup.button.callback("Dislike", "course_dislike")
            ]))
        })

        this.bot.action("course_like", (ctx) => {
            ctx.session.courseLike = true
            ctx.editMessageText("Cool")
        })

        this.bot.action("course_dislike", (ctx) => {
            ctx.session.courseLike = false
            ctx.editMessageText("((((")
        })
    }

}