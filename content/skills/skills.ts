/**
 * Datos de skills, separados de la UI. Sin porcentajes ni niveles inventados:
 * solo lo que está respaldado por experiencia laboral real o proyectos publicados.
 */

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Soporte técnico & Sistemas",
    skills: [
      "Soporte Técnico N1 / N2 y Helpdesk",
      "Diagnóstico de Hardware y Software",
      "Troubleshooting y Resolución de Incidencias",
      "Sistemas POS — Operación y Diagnóstico",
      "Gestión de Tickets y Cumplimiento de SLA (ITSM)",
    ],
  },
  {
    title: "Redes",
    skills: [
      "Configuración básica de routers y switches",
      "TCP/IP y DNS",
      "Diagnóstico de conectividad",
    ],
  },
  {
    title: "Desarrollo (en formación)",
    skills: [
      "PowerShell (automatización, CIM/WMI)",
      "Git y GitHub",
      "JavaScript / Node.js (fundamentos)",
      "Fundamentos de programación — Tecnicatura UTN (en curso)",
    ],
  },
  {
    title: "Herramientas & Documentación",
    skills: [
      "Documentación Técnica de Procesos",
      "Gestión de Inventario Digital y Auditoría",
      "Microsoft Office (Excel y Word) y Google Workspace",
      "Coordinación con Equipos Remotos",
      "Inglés técnico (lectura y comprensión)",
    ],
  },
];
