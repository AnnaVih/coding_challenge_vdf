const NO_STOCK = "NO_STOCK"
const INCORRECT_DETAILS = "INCORRECT_DETAILS"

type ErrorType = "NO_STOCK" | "INCORRECT_DETAILS" | null | undefined

type StatusesType = "error" | "processing" | "success"

export interface InputData {
    state: StatusesType
    errorCode?: ErrorType
}

interface OutputData {
    title: string
    message: string | null
}

interface HelperData {
    error: {
        NO_STOCK: OutputData
        INCORRECT_DETAILS: OutputData
    },
    success: OutputData
}

const helperData: HelperData = {
    error: {
        [NO_STOCK]: { title: 'Error page', message: 'No stock has been found' },
        [INCORRECT_DETAILS]: { title: 'Error page', message: 'Incorrect details have been entered' },
    },
    success: {
        title: "Order complete",
        message: null
    }
}

const statuses = {
    error: 'error',
    processing: 'processing',
    success: 'success'
}

const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

const getErrorOutput = (error: InputData): OutputData => {
    const { state, errorCode } = error
    if (errorCode && helperData["error"][errorCode]) {
        return helperData["error"][errorCode]
    } else {
        return { title: "Error page", message: null }
    }
}

export const getProcessingPage = async (data: InputData[]): Promise<OutputData | undefined> => {
    let output
    for (let i = 0; i < data.length; i++) {
        switch (data[i].state) {
            case statuses.processing:
                await timer(2000)
            case statuses.success:
                output = { ...helperData.success }
                break
            case statuses.error:
                output = getErrorOutput(data[i])
                break
        }
    }
    return output
}

getProcessingPage([{ state: "processing" }, { state: 'success' }]).then(res => console.log(res))