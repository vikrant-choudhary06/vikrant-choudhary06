import { handleContact, type ContactEnv } from '../../portfolio/src/lib/contact';

export const onRequestPost = ({ request, env }: { request: Request; env: ContactEnv }) => handleContact(request, env);
