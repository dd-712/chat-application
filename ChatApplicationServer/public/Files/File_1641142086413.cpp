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
	ll n,m;
	cin>>n>>m;
	vector<int> fr[100001];
	for(int i=0;i<n;i++)
	{
		int a,b;
		cin>>a>>b;
		fr[a].pb(b) , fr[b].pb(a);
	}
	cout<<"here"<<endl;
	map<int,int> p,q;
	for(int i=1;i<=n;i++)
	{
		int go=9;
		if(p[i]==1)
		go=0;
		else if(q[i]==1)
		go=1;
		set<ll> fi;
		cout<<"done"<<endl;
		for(ll j=0;j<fr[i].size();j++)
		{
			if(q[fr[i][j]]==1)
			fi.insert(1);
			else if(p[fr[i][j]]==1)
			fi.insert(0);
		}
		cout<<"done"<<endl;
		if(fi.size()==2)
		{
			cout<<"IMPOSSIBLE"<<endl;
			return;
		}
		else if(fi.size()==0)
		{
			if(go==9)
			p[i]=1,go=1;
			else
			go=1-go;
			
		}
		else
		{
			int want=*(fi.begin());
			if(go==want)
			{
				cout<<"IMPOSSIBLE"<<endl;
				return;
			}
			else if(go==9&&want==0)
			q[i]=1,go=want;
			else if(go==9&&want==1)
			p[i]=1,go=want;
			else
			go=want;
		}
		for(ll j=0;j<fr[i].size();j++)
		{
		    if(go==0)
			p[fr[i][j]]=1;
			else
			q[fr[i][j]]=1;
		}
		cout<<"done"<<endl;
	}
	for(ll i=1;i<n;i++)
	{
		if(p[i]==1)
		cout<<1<<" ";
		else if(q[i]==1)
		cout<<2<<" ";
		else
		cout<<1<<" ";
	}
	cout<<endl;
	return;
}


int main()
{
	ll n=1;
	cin>>n;
	
	for(ll i=0;i<n;i++)
	{
		solve();
	}
    return 0;
}

