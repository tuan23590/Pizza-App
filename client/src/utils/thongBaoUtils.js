import { GraphQLrequest } from './request';
import { gql, useSubscription } from '@apollo/client';

export const APINhanThongBao = () => {
  const { data, loading, error } = useSubscription(gql`
    subscription Notify {
  Notify {
    message
    type
  }
}
  `);
  return { data, loading, error };
};


export const APIThemThongBao = async (noiDung) => {
    const query = `mutation ThemThongBao($noiDung: String) {
  themThongBao(noiDung: $noiDung) {
    id
  }
}`;
    const {themThongBao} = await GraphQLrequest({query, variables: {noiDung}});
    return themThongBao;
};