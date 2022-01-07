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
	vector<ll> p;
	ll sum=0;
	for(ll i=0;i<n;i++)
	{
		ll num;
		cin>>num;
		p.pb(num);
	}
	sort(p.begin(),p.end());
	
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


