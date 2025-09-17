import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "../lib/arcject.js";

export const arcjectProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ success: false, message: "Rate limite exceed ! please try again later" })
            }

            else if (decision.reason.isBot()) {
                return res.status(403).json({ success: false, message: "bot access denied" })
            }
            else {
                return res.status(403).json({ success: false, message: "access denied by security policy" })
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                success: false, 
                message: "spoofedBot detected",
                message: "Malicious activity detected", 
            })
        }

        next()
    } catch (error) {
        console.log("arcject protection error", error)
        next()
    }
}