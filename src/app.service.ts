import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GITHUB_TOKEN } from './constants';

@Injectable()
export class AppService {
  async getSearchUsers(
    searchText: string,
    currentPage: number,
    perPage: number,
  ) {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&page=${currentPage}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        },
      );

      const data = response.data.items;

      const promises = data.map(async (item: any) => {
        const userDataResponse = await axios.get(item.url, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        });

        const userData = userDataResponse.data;
        return userData;
      });

      const usersData = await Promise.all(promises);

      return this.filterUsersdata(this.sortUsersOnFolllwers(usersData));
    } catch (error) {
      throw new Error(`Failed to fetch GitHub users: ${error.message}`);
    }
  }

  async getRandomUsers(currentPage: number, perPage: number) {
    try {
      const response = await axios.get(
        `https://api.github.com/users?since=${currentPage}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        },
      );

      const data = response.data;
      console.log(
        '🚀 ~ file: app.service.ts:55 ~ AppService ~ getRandomUsers ~ response:',
        response.data,
      );

      const promises = data.map(async (item: any) => {
        const userDataResponse = await axios.get(item.url, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        });

        const userData = userDataResponse.data;
        return userData;
      });

      const usersData = await Promise.all(promises);

      return this.filterUsersdata(this.sortUsersOnFolllwers(usersData));
    } catch (error) {
      throw new Error(`Failed to fetch GitHub users: ${error.message}`);
    }
  }

  sortUsersOnFolllwers(usersData: any) {
    const sortedUsers = usersData.sort(
      (a: any, b: any) => b.followers - a.followers,
    );
    return sortedUsers;
  }

  filterUsersdata(sortedUsers: any) {
    const filteredUsers = sortedUsers.map((user: any) => ({
      name: user.name,
      followers: user.followers,
      public_repos: user.public_repos,
      html_url: user.html_url,
      avatar_url: user.avatar_url,
      location: user.location,
      login: user.login,
    }));
    return filteredUsers;
  }
}
