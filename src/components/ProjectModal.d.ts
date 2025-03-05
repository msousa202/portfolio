import { Project } from './Projects';

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

declare const ProjectModal: React.FC<ProjectModalProps>;

export default ProjectModal;
