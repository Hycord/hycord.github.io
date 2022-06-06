/** @type {import('@sveltejs/kit').RequestHandler} */
export function get(event) {
  // log all headers
  console.log(...event.request.headers);
 
  return {
    body: {
      // retrieve a specific header
      headers: [...event.request.headers]
    }
  };
}