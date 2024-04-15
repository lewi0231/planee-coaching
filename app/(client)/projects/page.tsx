import { getProjectData } from "@/actions/project-actions";
import ProjectPage from "./project-page";

const page = async () => {
  const projects = await getProjectData();
  console.log("projects from parent", projects);

  return <ProjectPage projects={projects} />;
};

export default page;
