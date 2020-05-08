import { getProcessingPage, InputData } from '../'

describe("getProcessingPage", () => {
    it("returns success data", async () => {
        const data = await getProcessingPage([{ state: "success" }])
        expect(data).toEqual({ title: 'Order complete', message: null })
    })

    it("returns error data with `NO_STOCK` message ", async () => {
        const data = await getProcessingPage([{ state: "error", errorCode: "NO_STOCK" }])
        expect(data).toEqual({ title: 'Error page', message: "No stock has been found" })
    })

    it("returns error data with `INCORRECT_DETAILS` message ", async () => {
        const data = await getProcessingPage([{ state: "error", errorCode: "INCORRECT_DETAILS" }])
        expect(data).toEqual({ title: 'Error page', message: "Incorrect details have been entered" })
    })

    it("returns error data with no message ", async () => {
        const data = await getProcessingPage([{ state: "error" }])
        expect(data).toEqual({ title: 'Error page', message: null })
    })

    it("returns next state success data after 2000 ms", async () => {
        const data = await getProcessingPage([{ state: "processing" }, { state: "success" }])
        expect(data).toEqual({ title: 'Order complete', message: null })
    })
})