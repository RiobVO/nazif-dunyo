import type { MetadataRoute } from "next";

/**
 * Демо закрыто от поисковиков: на сайте временные стоковые фото и не
 * подтверждённые компанией контакты — попадание в выдачу по запросу
 * «Nazif Dunyo» было бы вредно.
 * TODO: снять запрет перед реальным запуском.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
