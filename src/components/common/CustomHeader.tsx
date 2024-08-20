'use client'

import { useAuth } from "@/components/authentication";
import { useState } from "react";
import { ProfileSection } from "@/components/common";

interface CustomHeaderProps {
  className?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({className}) => {
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { photoURL, displayName } = currentUser || {};

  return (
    <header className={`${className} flex justify-between items-center`}>
      <section className="branding flex items-center py-2">
        <div className="logo gurmukhi">ਸ਼</div>
        <h3 className="heading pl-3">Shabadavali.</h3>
      </section>
      {currentUser && (
        <section>
          <div className="flex items-center">
            <span
              className="display-pic rounded-full bg-no-repeat bg-cover bg-top w-14 h-14 cursor-pointer"
              onClick={() => setShowModal(!showModal)}
              style={{ backgroundImage: `url(${photoURL})` }}
            >
              {!photoURL && displayName?.charAt(0)}
            </span>
            {showModal && <ProfileSection />}
          </div>
        </section>
      )}
    </header>
  );
};
export default CustomHeader;
