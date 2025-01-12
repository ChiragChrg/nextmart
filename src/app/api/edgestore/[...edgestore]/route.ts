import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    publicImages: es.imageBucket({
        maxSize: 1024 * 1024 * 10,
        accept: ["image/png", "image/jpeg", "image/jpg", "image/webp"]
    })
});
const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;

