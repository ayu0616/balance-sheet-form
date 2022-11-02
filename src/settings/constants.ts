/**クロスオリジンエラーを回避するために先頭につけるURL */
export const NOT_CORS_URL = "https://glacial-shelf-66484.herokuapp.com/";

/**勘定科目が入ったURL */
export const SHEET_DATA_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTzylVbI70t0PnmrATYrlbk6r0_jHcxze5qzsHemYI4FHI5P0zxSBHjY4nWH5Or-r9nas9lGI4SpqZ/pub?gid=0&single=true&output=csv";

/**GoogleフォームのURL */
export const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeBETN_CleUHfVUtf77pMlWdPpoB1xNLt8kXIFidxX_yecRcw/formResponse";

/**フォームのname */
export const GOOGLE_FORM_NAMES = {
    date: "entry.659234044",
    karikata: "entry.303651965",
    kashikata: "entry.119141977",
    amount: "entry.1479643549",
    content: "entry.2026820537",
} as const;
