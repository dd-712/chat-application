#include <bits/stdc++.h>
#include <iostream>
#include<algorithm>
#include <string>
#include <queue>
#include<sstream>  
#include<map>
#include<vector>
#include<set>
#include<math.h>


using namespace std;
bool fi(int x,int y)
{
	return x>y;
}

int len(long long int num)
{
	int count=0;
	while(num!=0)
	{
		count++;
		num/=10;
	}
	return count;
}
 
#define pairrr pair<long long,int>
#define ll long long int
#define pairr pair<ll,ll>
#define pairrrr pair<pairr,pairr>
#define pairss pair<ll,pairr>
#define pb push_back
ll mod=1000000000+7;

void solve()
{
	
	return;
}

int main()
{
	ll n=1;
	cin>>n;

	for(ll i=0;i<n;i++)
	{
		ll n,c;
		cin>>n>>c;
		ll arr[n],brr[n],l=0,s=0;
		map<ll,ll> p,q;
		for(ll i=0;i<n;i++)
		{
			ll n1,n2
			cin>>n1>>n2;
			p[n1]++;
			p[n2]++;
			if(p[n1]==1)
			arr[l++]=n1;
			if(p[n2]==1)
			brr[s++]=n2;
		}
		sort(arr,arr+l,fi);
		sort(brr,brr+s);
		ll count=0,s1=0,s2=0,ans[2*n],i=0;
		while(c)
		{
			if(l-1==s1&&s-1==s2)
			break;
			else if(s-1==s2)
			{
				ans[i++]=arr[s1];
				s1++;
				c--;
			}
			else if(l-1==s1)
			{
				ans[i++]=brr[s2];
				s2++;
				c--;
			}
			else if(l-s1>s-s2)
			{
				ans[i++]=arr[s1];
				s1++;
				c--;
			}
			else
			{
				ans[i++]=brr[s2];
				s2++;
				c--;
			}
		}
		sort(ans,ans+i);
		cout<<"Case #"<<i+1<<": "<<count+ma<<endl;
	}
	return 0;
}

