"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { UserContext } from "@/app/contexts/context";
import Spinner from "./Spinner";
import LeftDrawer from "./LeftDrawer";

const UserDisplay = () => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])
  return (
    <div className={styles.userDisplay}>
      {Object.keys(currentUser).length === 0
        ? <Spinner />
        : (
          <>
              <button className={`${styles.btnShowUsers} btn btn-outline-danger`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="red" />
                </svg>&nbsp;
                Show Users
              </button>
            <div className="d-flex flex-column align-items-center my-5">
              <div className={`${styles.imageNName} d-flex align-items-center gap-3`}>
                <div>
                  {
                    currentUser.avatar.includes("cdn.fakercloud.com")
                      ? <Image src="/profile.webp" alt="..." className={`${styles.userAvatar} img-fluid`} height={140} width={140} />
                      : <Image src={currentUser.avatar} alt="..." className={`${styles.userAvatar} img-fluid`} height={140} width={140} />
                  }
                </div>
                <div className={styles.name}>
                  <div className={styles.fullName}>{currentUser.profile.firstName + " " + currentUser.profile.lastName}</div>
                  <div className={styles.username}>@{currentUser.profile.username}</div>
                </div>
              </div>

              <div className={styles.bio}>
                {currentUser.Bio}
              </div>
              <div className={styles.jobNEmail}>
                <div className={styles.job}>{currentUser.jobTitle}</div>
                <div className={styles.email}>{currentUser.profile.email}</div>
              </div>

            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">All Users</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <LeftDrawer platform="mobile" />
              </div>
            </div>
          </>
        )
      }

    </div >
  )
}

export default UserDisplay;
