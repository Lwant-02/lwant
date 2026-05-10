"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

import { containerVariants, itemVariants } from "@/constant";
import { Button } from "../ui/button";
import { ProjectData } from "@/type";

interface ProjectDetailProps {
  project: ProjectData;
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <section className="w-full pt-10 pb-32" id="project-detail">
      <motion.div
        className="w-full mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Button asChild variant="outline" className="outline-btn group w-72">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              All Projects
            </Link>
          </Button>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight"
          variants={itemVariants}
        >
          {project.title}
        </motion.h1>

        {/* Date */}
        <motion.div
          className="flex items-center gap-2 text-muted-foreground"
          variants={itemVariants}
        >
          <Calendar className="size-4 text-blue-400" />
          <span className="text-base font-jetbrains-mono">{project.date}</span>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative w-full aspect-video rounded-md overflow-hidden border border-foreground shadow-sm"
          variants={itemVariants}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="eager"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Description & Details */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            About This Project
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-jetbrains-mono">
            {project.description}
          </p>
          {project.details && project.details.length > 0 && (
            <ul className="space-y-4 pt-4">
              {project.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-muted-foreground text-sm space-y-1 md:text-lg font-jetbrains-mono"
                >
                  <span className="text-blue-400 mt-1.5 shrink-0">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Tech Stack */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-foreground px-4 py-2 rounded-full border border-blue-300/30"
              >
                <span className="text-sm font-jetbrains-mono text-muted-foreground">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        {project.demoLink && (
          <motion.div variants={itemVariants}>
            <Button
              asChild
              variant="outline"
              className="outline-btn group w-72"
            >
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Check out Live
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
