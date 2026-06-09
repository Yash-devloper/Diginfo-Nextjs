"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllTeamMembers, type TeamMember } from "@/lib/team";

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await getAllTeamMembers();
      setTeam(data);
    };

    void fetchTeam();
  }, []);

 const placeholders: TeamMember[] = [
  {
    id: "1",
    name: "XXXX XXXX",
    role: "Founder & Strategist",
    imageUrl: "",
    description: "Leading strategic growth and digital innovation since 2019.",
    order: 1,
  },
  {
    id: "2",
    name: "XXX XXXX",
    role: "Performance Marketer",
    imageUrl: "",
    description: "Specialist in data-driven advertising and lead generation.",
    order: 2,
  },
  {
    id: "3",
    name: "XXX XXXX",
    role: "UI/UX Designer",
    imageUrl: "",
    description: "Crafting intuitive digital experiences that convert.",
    order: 3,
  },
  {
    id: "4",
    name: "Yash Sharma",
    role: "Full Stack Developer",
    imageUrl: "",
    description: "Building high-performance web applications with modern tech.",
    order: 4,
  },
];

  const members = team.length > 0 ? team : placeholders;

  return (
    <section id="team" className="sec dark">
      <div className="wrap">

        <div className="center">
          <div className="pill-label">OUR TEAM</div>

          <h2 className="h2">
            The People Behind the <span className="gt">Growth.</span>
          </h2>
        </div>

        <div className="team-grid">
          {members.map((member) => (
            <div key={member.id} className="team-card">

              <div className="team-img">
                {member.imageUrl && (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>

              <h4>{member.name}</h4>
              <p>{member.role}</p>
              {member.description && <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5' }}>{member.description}</p>}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}