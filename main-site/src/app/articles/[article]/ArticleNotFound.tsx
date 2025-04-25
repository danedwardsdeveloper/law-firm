import NotFoundLayout from "@/components/NotFoundLayout";
import { getArticles } from "@/library/cms/payload";
import ArticleCard from "../ArticleCard";

export default async function ArticleNotFound() {
	const allArticles = await getArticles();

	return (
		<NotFoundLayout
			contentType="article"
			suggestedContentTitle="Were you looking for any of these articles?"
			showStoryBrand={false}
			suggestedContent={allArticles.map((article, index) => (
				<ArticleCard
					key={article.slug}
					article={article}
					priority={index < 2}
				/>
			))}
		/>
	);
}
