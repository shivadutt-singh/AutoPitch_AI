import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="w-full max-w-3xl flex flex-col p-8 gap-8 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">
          About Orbit
        </h1>
        <div className="prose prose-invert prose-zinc prose-sm md:prose-base">
          <p className="text-zinc-400 text-lg leading-relaxed">
            We built Orbit to solve a very specific problem: understanding why a landing page isn't converting, and fixing it fast.
          </p>
          <p className="text-zinc-400 leading-relaxed mt-4">
            In the early days of building our own SaaS, we spent countless hours manually auditing competitors, writing 
            outreach scripts, and drafting proposals. It was a tedious process that didn't scale.
          </p>
          <p className="text-zinc-400 leading-relaxed mt-4">
            Orbit changes that. By combining advanced heuristic analysis with LLM-powered context generation, 
            we can instantly identify the fundamental friction points in any funnel.
          </p>
          
          <div className="h-px bg-[#1F1F1F] w-full my-8"></div>
          
          <h2 className="text-xl font-medium text-white mb-4">Our Values</h2>
          <ul className="space-y-4 text-zinc-400 list-none pl-0">
            <li>
              <strong className="text-zinc-200">High Density, Low Noise:</strong> We present data with maximum clarity. No vanity metrics.
            </li>
            <li>
              <strong className="text-zinc-200">Action Oriented:</strong> Finding a problem is only half the battle. We always provide the script or proposal to fix it.
            </li>
            <li>
              <strong className="text-zinc-200">Continuous Optimization:</strong> We dogfood our own product to constantly improve the heuristic engine.
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
