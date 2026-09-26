import { ContentManagerPage } from "../_components/content-manager-page";
import { contentConfigs } from "@/lib/admin/content-config";

export default function CompetitionsAdminPage() {
  return <ContentManagerPage config={contentConfigs.competitions} />;
}
