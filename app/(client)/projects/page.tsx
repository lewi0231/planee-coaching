import { getProjectData } from "@/actions/project-actions";
import ProjectPage from "./project-page";

const page = async () => {
  const projects = await getProjectData();

  return <ProjectPage projects={projects} />;
};

export default page;
