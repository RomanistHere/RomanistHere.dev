export async function load({ params }) {
	const post = await import(`../../second-layer/${params.slug}.md`);
	const { title } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
	};
}
