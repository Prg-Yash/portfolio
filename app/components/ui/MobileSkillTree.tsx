"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ALL_NODES, LINKS, CATEGORY_COLORS, StarNode } from "./ConstellationSkillMap";

interface MobileSkillTreeProps {
  selectedCategory?: string;
  className?: string;
}

type CenterMode = "essence" | string; // 'essence' or category name

export const MobileSkillTree: React.FC<MobileSkillTreeProps> = ({
  selectedCategory = "ALL",
  className = "",
}) => {
  const [centerMode, setCenterMode] = useState<CenterMode>("essence");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  // If the parent filter changes (e.g. from the pill buttons in Stage03Curiosity),
  // we can sync our internal state to match.
  useEffect(() => {
    if (selectedCategory === "ALL") {
      setCenterMode("essence");
    } else {
      setCenterMode(selectedCategory);
    }
    setExpandedSkill(null);
  }, [selectedCategory]);

  const categories = useMemo(() => ["Frontend", "Backend", "AI & Automations", "Databases", "Tools"], []);

  // Filter skills based on current center mode
  const activeSkills = useMemo(() => {
    if (centerMode === "essence") return [];
    return ALL_NODES.filter((n) => n.category === centerMode);
  }, [centerMode]);

  const handleCategoryTap = (cat: string) => {
    if (centerMode === cat) {
      // Tap again to collapse
      setCenterMode("essence");
    } else {
      setCenterMode(cat);
    }
    setExpandedSkill(null);
  };

  const handleSkillTap = (id: string) => {
    setExpandedSkill(expandedSkill === id ? null : id);
  };

  // Dimensions
  const R1 = 95; // Radius for categories when essence is center
  const R2 = 135; // Radius for skills when a category is center

  // Layout calculations
  const getCategoryPosition = (cat: string, index: number) => {
    if (centerMode === "essence") {
      // Circle around essence
      const angle = (index * (360 / categories.length) - 90) * (Math.PI / 180);
      return { x: R1 * Math.cos(angle), y: R1 * Math.sin(angle), scale: 1, opacity: 1 };
    }
    if (centerMode === cat) {
      // Moves to center
      return { x: 0, y: 0, scale: 1.2, opacity: 1 };
    }
    // Other categories form an arc at the bottom
    const inactiveIndex = categories.filter((c) => c !== centerMode).indexOf(cat);
    // 4 inactive categories. Angles from 45 to 135 (bottom)
    const angle = (45 + inactiveIndex * (90 / 3)) * (Math.PI / 180);
    const bottomR = 210;
    return { x: bottomR * Math.cos(angle), y: bottomR * Math.sin(angle) + 40, scale: 0.8, opacity: 0.5 };
  };

  const getSkillPosition = (index: number, total: number) => {
    // Circle around the center category
    const angle = (index * (360 / total) - 90) * (Math.PI / 180);
    return { x: R2 * Math.cos(angle), y: R2 * Math.sin(angle) };
  };

  const activeSkillNode = useMemo(() => ALL_NODES.find((n) => n.id === expandedSkill), [expandedSkill]);

  return (
    <div className={`relative w-full h-[650px] overflow-hidden select-none ${className}`}>
      
      <style>{`
        @keyframes floatIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .float-anim {
          animation: floatIdle 4s ease-in-out infinite;
        }
        .float-anim-delay {
          animation: floatIdle 5s ease-in-out infinite 1s;
        }
      `}</style>

      {/* Container centered in the viewport */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 float-anim">
        
        {/* Connection Lines */}
        <svg className="absolute top-[-400px] left-[-400px] w-[800px] h-[800px] pointer-events-none" style={{ zIndex: 0 }}>
          <g transform="translate(400, 400)">
            {/* Lines from Essence to Categories */}
            {categories.map((cat, i) => {
              const pos = getCategoryPosition(cat, i);
              const color = CATEGORY_COLORS[cat] || "#ffffff";
              return (
                <line
                  key={`line-essence-${cat}`}
                  x1="0" y1="0" x2={pos.x} y2={pos.y}
                  stroke={color}
                  strokeWidth="1.5"
                  className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: centerMode === "essence" ? 0.3 : 0,
                    strokeDasharray: centerMode === "essence" ? "none" : "4 4"
                  }}
                />
              );
            })}

            {/* Lines from active Category to Skills */}
            {centerMode !== "essence" && activeSkills.map((skill, i) => {
              const pos = getSkillPosition(i, activeSkills.length);
              const color = CATEGORY_COLORS[skill.category] || "#ffffff";
              return (
                <line
                  key={`line-skill-${skill.id}`}
                  x1="0" y1="0" x2={pos.x} y2={pos.y}
                  stroke={color}
                  strokeWidth="1"
                  className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: 0.4 }}
                />
              );
            })}
          </g>
        </svg>

        {/* Center Node (Essence) */}
        <div
          className="absolute flex items-center justify-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 cursor-pointer"
          style={{
            transform: `translate(-50%, -50%) scale(${centerMode === "essence" ? 1 : 0})`,
            opacity: centerMode === "essence" ? 1 : 0,
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
            boxShadow: "0 0 30px rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
          onClick={() => setCenterMode("essence")}
        >
          <div className="absolute inset-0 rounded-full animate-pulse opacity-30" style={{ background: "radial-gradient(circle, #fff 0%, transparent 60%)" }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold z-10">ESSENCE</span>
        </div>

        {/* Category Nodes */}
        {categories.map((cat, i) => {
          const pos = getCategoryPosition(cat, i);
          const color = CATEGORY_COLORS[cat] || "#ffffff";
          const isActive = centerMode === cat;
          return (
            <div
              key={`cat-${cat}`}
              className="absolute flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 cursor-pointer group"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${pos.scale})`,
                opacity: pos.opacity,
              }}
              onClick={() => handleCategoryTap(cat)}
            >
              <div
                className="rounded-full flex items-center justify-center relative"
                style={{
                  width: isActive ? "75px" : "60px",
                  height: isActive ? "75px" : "60px",
                  background: `linear-gradient(135deg, ${color}30, ${color}05)`,
                  border: `1px solid ${isActive ? color : `${color}60`}`,
                  boxShadow: isActive ? `0 0 40px ${color}50, inset 0 0 20px ${color}30` : `0 0 15px ${color}20`,
                }}
              >
                {/* Inner bright core */}
                <div
                  className="rounded-full"
                  style={{
                    width: isActive ? "25px" : "15px",
                    height: isActive ? "25px" : "15px",
                    background: color,
                    boxShadow: `0 0 15px ${color}`,
                  }}
                />
              </div>
              <span
                className="absolute font-mono text-[9px] uppercase font-bold tracking-[0.15em] whitespace-nowrap transition-all duration-300"
                style={{
                  color: isActive ? "#ffffff" : color,
                  top: isActive ? "85px" : "65px",
                  textShadow: `0 0 10px ${color}`,
                }}
              >
                {cat}
              </span>
            </div>
          );
        })}

        {/* Skill Nodes */}
        {activeSkills.map((skill, i) => {
          const pos = getSkillPosition(i, activeSkills.length);
          const color = CATEGORY_COLORS[skill.category] || "#ffffff";
          const isExpanded = centerMode !== "essence";
          const isSelected = expandedSkill === skill.id;
          
          return (
            <div
              key={`skill-${skill.id}`}
              className="absolute flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-30 cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${isExpanded ? 1 : 0})`,
                opacity: isExpanded ? 1 : 0,
                pointerEvents: isExpanded ? "auto" : "none",
              }}
              onClick={() => handleSkillTap(skill.id)}
            >
              <div
                className="rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  width: isSelected ? "50px" : "40px",
                  height: isSelected ? "50px" : "40px",
                  background: isSelected ? `${color}40` : `${color}15`,
                  border: `1px solid ${isSelected ? color : `${color}40`}`,
                  boxShadow: isSelected ? `0 0 20px ${color}60` : "none",
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                />
              </div>
              <span
                className="absolute top-[115%] font-mono text-[8px] uppercase tracking-[0.1em] text-white/80 whitespace-nowrap"
                style={{
                  color: isSelected ? "#ffffff" : "rgba(255,255,255,0.7)",
                  textShadow: isSelected ? `0 0 8px ${color}` : "none",
                }}
              >
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Floating Information Card */}
      <div
        className={`absolute bottom-4 left-4 right-4 p-5 rounded-2xl border backdrop-blur-2xl transition-all duration-500 z-50 ${
          activeSkillNode ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          borderColor: activeSkillNode ? `${CATEGORY_COLORS[activeSkillNode.category]}40` : "transparent",
          background: activeSkillNode ? `linear-gradient(135deg, ${CATEGORY_COLORS[activeSkillNode.category]}12 0%, rgba(0,0,0,0.85) 50%)` : "transparent",
          boxShadow: activeSkillNode ? `0 20px 40px rgba(0,0,0,0.5), 0 0 40px ${CATEGORY_COLORS[activeSkillNode.category]}20` : "none",
        }}
      >
        {activeSkillNode && (
          <>
            <button
              className="absolute top-4 right-4 text-white/30 hover:text-white font-mono text-[10px] tracking-widest"
              onClick={() => setExpandedSkill(null)}
            >
              [X]
            </button>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: CATEGORY_COLORS[activeSkillNode.category],
                  boxShadow: `0 0 8px ${CATEGORY_COLORS[activeSkillNode.category]}`,
                }}
              />
              <span
                className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold"
                style={{ color: CATEGORY_COLORS[activeSkillNode.category] }}
              >
                {activeSkillNode.category}
              </span>
            </div>
            
            <h3 className="font-serif-italic text-2xl mb-1 text-[#f5f0e8] drop-shadow-md">
              {activeSkillNode.name}
            </h3>
            
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase">Proficiency</span>
              <div className="flex-1 ml-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${activeSkillNode.level}%`,
                    background: CATEGORY_COLORS[activeSkillNode.category],
                    boxShadow: `0 0 10px ${CATEGORY_COLORS[activeSkillNode.category]}`,
                  }}
                />
              </div>
              <span className="ml-3 font-mono text-[10px] font-bold" style={{ color: CATEGORY_COLORS[activeSkillNode.category] }}>
                {activeSkillNode.level}%
              </span>
            </div>

            <p className="font-sans text-[11px] leading-relaxed text-white/70 mb-4">
              {activeSkillNode.description}
            </p>
            
            {/* Generate "Commonly used with" dynamically using LINKS */}
            <div className="pt-3 border-t border-white/10">
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase block mb-2">
                Commonly Used With
              </span>
              <div className="flex flex-wrap gap-1.5">
                {LINKS.filter(([a, b]) => a === activeSkillNode.id || b === activeSkillNode.id).map(([a, b]) => {
                  const partnerId = a === activeSkillNode.id ? b : a;
                  const partner = ALL_NODES.find(n => n.id === partnerId);
                  if (!partner) return null;
                  return (
                    <span
                      key={partnerId}
                      className="px-2 py-1 rounded border border-white/10 bg-white/5 font-mono text-[8px] uppercase tracking-wider text-white/60"
                    >
                      {partner.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Helper text at the very top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-2">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
          {centerMode === "essence" ? "Tap a cluster to explore" : "Tap center to close cluster"}
        </span>
      </div>

    </div>
  );
};
