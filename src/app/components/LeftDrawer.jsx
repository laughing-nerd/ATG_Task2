"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "@/app/page.module.css"
import { UserContext } from "../contexts/context";
import Spinner from "./Spinner";

const LeftDrawer = ({ platform }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
    axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  const showUsers = (e) => {
    let className = `${styles.users}`;
    if (e === currentUser)
      className = className + ` ${styles.selectedUser}`;

    return (<>
      {
        Object.keys(e).length === 0
          ? <div>Person not found</div>
          : <div className={className}
            onClick={() => setCurrentUser(e)}
            data-bs-dismiss={platform === "mobile" ? "offcanvas" : null}
          >            {
              e.avatar.includes("cdn.fakercloud.com")
                ? <Image src="/profile.webp" alt="..." className={styles.userAvatar} height={36} width={36} />
                : <Image src={e.avatar} alt="..." className={styles.userAvatar} height={36} width={36} />
            }

            {e.profile.firstName + " " + e.profile.lastName}
          </div >
      }
    </>
    )
  }

  if (Object.keys(currentUser).length === 0 && users.length !== 0)
    setCurrentUser(users[0])

  return (
    <div className={platform === "mobile" ? styles.leftDrawerMobile : styles.leftDrawerDesktop}>
    <form>
      <input name="search" type="text" placeholder="&#128269; Search for a person" className={`${styles.search} form-control rounded my-2`} onChange={(e) => setQuery(e.target.value)} />
    </form>

      {users.length === 0
        ? <Spinner />
        : (
          query.length === 0 ? (
            users.map(showUsers)
          ) : (
            users.filter((x) => {
              const name = x.profile.firstName + x.profile.lastName;
              return query.toLowerCase() === '' ? x : name.toLowerCase().includes(query.toLowerCase());
            }).length === 0 ? (
              <div className={styles.notFound}>No matching users found!</div>
            ) : (
              users
                .filter((x) => {
                  const name = x.profile.firstName + x.profile.lastName;
                  return query.toLowerCase() === '' ? x : name.toLowerCase().includes(query.toLowerCase());
                })
                .map(showUsers)
            )
          ))
      }
    </div>
  )
}
export default LeftDrawer;
