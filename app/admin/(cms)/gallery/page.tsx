import { ContentManagerPage } from "@/app/admin/(cms)/_components/content-manager-page";
import { contentConfigs } from "@/lib/admin/content-config";

export default function AdminGalleryPage() {
  return <ContentManagerPage config={contentConfigs.gallery} />;
}
