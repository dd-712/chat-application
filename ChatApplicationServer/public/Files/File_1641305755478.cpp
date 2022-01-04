#include <bits/stdc++.h>

using namespace std;

#define ll long long int
#define pairr pair<ll,ll>
#define pairrr pair<pairr,pairr>
#define pairss pair<ll,pairr>
#define pb push_back
ll mod=1000000000+7;

bool fi(ll x,ll y)
{
    return x>y;
}

ll len(ll num)
{
    ll count=0;
    while(num!=0)
    {
        count++;
        num/=10;
    }
    return count;
}

void solve()
{
	ll n;
	cin>>n;
	vector<pairr> p;
	for(ll i=0;i<n;i++)
	{
		ll a,b;
		cin>>a>>b;
		p.pb({b,a});
	}
	sort(p.begin(),p.end());
	ll count=1,en=p[0].first;
	for(ll i=1;i<n;i++)
	{
		if(p[i].second>=en)
		count++,en=p[i].first;
	}
	cout<<count<<endl;
	return;
}


int main()
{
	ll n=1;
	//cin>>n;
	
	for(ll i=0;i<n;i++)
	{
		solve();
	}
    return 0;
}
