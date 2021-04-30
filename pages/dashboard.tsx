import { useContext, useEffect } from "react"
import Router from 'next/router';

import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth"
import { useCan } from "../hooks/useCan";

export default function Dashboard() {
  const { user, isAuthenticated } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    roles: ['administrator', 'editor']
  });

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      { userCanSeeMetrics && <div>Métricas</div> }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data)

  return {
    props: {}
  }
})