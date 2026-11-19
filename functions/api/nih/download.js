import { handle } from '../../../server/nih-download.mjs';
export const onRequest = ({ request, env }) => handle(request, env, 'download');
