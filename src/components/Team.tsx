"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllTeamMembers, type TeamMember } from "@/lib/team";

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  // State to track image loading errors for each team member by ID
  const [memberImageError, setMemberImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await getAllTeamMembers();
      setTeam(data);
    };

    void fetchTeam();
  }, []);
 
  // Function to get initials from a name
  const getInitials = (name: string): string => {
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Function to handle image error for a specific member
  const handleImageError = (memberId: string) => {
    setMemberImageError((prevErrors) => ({
      ...prevErrors,
      [memberId]: true,
    }));
  };

  const placeholders: TeamMember[] = [
  {
    id: "1",
    name: "Swarnjeet Singh",
    role: "Founder & Strategist",
    imageUrl: "",
    description: "Leading strategic growth and digital innovation since 2019.",
  },
  {
    id: "2",
    name: "XXX XXXX",
    role: "Performance Marketer",
    imageUrl: "",
    description: "Specialist in data-driven advertising and lead generation.",
  },
  {
    id: "3",
    name: "XXX XXXX",
    role: "UI/UX Designer",
    imageUrl: "",
    description: "Crafting intuitive digital experiences that convert.",
  },
  {
    id: "4",
    name: "Yash Sharma",
    role: "Full Stack Developer",
    imageUrl: "",
    description: "Building high-performance web applications with modern tech.",
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

              <div className="team-img" style={{ position: 'relative', height: '220px', borderRadius: '12px', background: 'linear-gradient(135deg,#1a1a2e,#2a2a40)', marginBottom: '15px', overflow: 'hidden' }}>
                {(member.imageUrl && !memberImageError[member.id]) ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                    onError={() => handleImageError(member.id)}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-1px' }}>
                      {getInitials(member.name)}
                    </span>
                  </div>
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