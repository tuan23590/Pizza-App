import { createClient } from 'graphql-ws';
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../utils/constants';
import { GraphQLrequest } from './request';

const client = createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});


export async function subscribeToNotifications(callback) {
    const subscription = client.iterate({
        query: `subscription Notify {
  Notify {
    id
    noiDung
    nguoiNhan
    trangThai
    hinhAnh
    createdAt
  }
}`,
    });

    for await (const event of subscription) {
        if (event.data && event.data.Notify) {
            callback(event.data.Notify);
        }
    }
}

export const APIThemThongBao = async (noiDung) => {
    const query = `mutation ThemThongBao($noiDung: String) {
  themThongBao(noiDung: $noiDung) {
    id
  }
}`;
    const {themThongBao} = await GraphQLrequest({query, variables: {noiDung}});
    return themThongBao;
};