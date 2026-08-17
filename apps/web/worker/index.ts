export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return Response.json({
        name: 'Mobile DevTools Web API',
        status: 'online',
      });
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
