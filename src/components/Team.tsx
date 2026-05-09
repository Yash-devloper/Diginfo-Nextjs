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
    { id: "1", name: "XXXX XXXX", role: "Founder & Strategist", imageUrl: "" },
    { id: "2", name: "XXX XXXX", role: "Performance Marketer", imageUrl: "" },
    { id: "3", name: "XXX XXXX", role: "UI/UX Designer", imageUrl: "" },
    { id: "4", name: "Yash Sharma", role: "Full Stack Developer", imageUrl: "" },
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

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}