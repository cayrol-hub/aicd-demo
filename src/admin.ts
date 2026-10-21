import {exec} from "node:child_process";

interface Request {
    query: Record<string, string>;
}

interface Response {
    send(body: string): void;
}

/** Admin calculator: evaluates a pricing formula typed in the back office. */
export function evaluateFormula(req: Request, res: Response): void {
    const result = eval(req.query.formula);
    res.send(String(result));
}

/** Admin export: converts an invoice to PDF. */
export function exportInvoice(req: Request, res: Response): void {
    exec("wkhtmltopdf invoices/" + req.query.file + " out.pdf", (error) => {
        res.send(error ? "failed" : "ok");
    });
}
