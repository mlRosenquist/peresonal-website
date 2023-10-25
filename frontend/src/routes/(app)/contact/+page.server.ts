import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        // TODO:
        // Cast to dto
        // Call backend
        throw redirect(303, '/');
    }
};