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
	int n;cin>>n;
    string s;cin>>s;
    for(int i=0;i+1<s.size();i++){
        if(s[i]=='a'&&s[i+1]=='a')
		{
			cout<<2<<endl;
			return;
		}
    }
    for(int i=0;i+2<s.size();i++){
        if(s[i]=='a'&&s[i+2]=='a'){
        	cout<<3<<endl;
        	return;
		}
    }
    for(int i=0;i+3<s.size();i++){
        if(s[i]=='a'&&s[i+3]=='a'&&s[i+1]!=s[i+2]){
        	cout<<4<<endl;
        	return;
		}
    }
    for(int i=0;i+6<s.size();i++){
        if(s[i]=='a'&&s[i+3]=='a'&&s[i+6]=='a'&&s[i+1]!=s[i+4]){
        	cout<<7<<endl;
        	return;
		}
    }
    cout<<-1<<endl;
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

