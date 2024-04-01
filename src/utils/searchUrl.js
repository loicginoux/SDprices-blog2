// export const searchUrl = import.meta.env.MODE == "development" ? "http://localhost:4000/api/search" : "https://api.sdprices.com/api/search"

let searchUrl =  "http://127.0.0.1:54321/functions/v1/search"
if (import.meta.env.MODE != "development") {
  searchUrl = "https://tdzlyurkltsgordwhbbq.supabase.co/functions/v1/search"

}

export { searchUrl }