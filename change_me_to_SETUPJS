use meteor;
db.users.remove({});
db.topics.remove({});
db.news.remove({});
db.endChatRequests.remove({});
db.topicsList.remove({});
db.messages.remove({});
db.endChatRequests.remove({});

//////topics
db.topics.insert({
	"topicName": "Tax Cut Policy",
	"username": "saber",
	"side": "Left"
});
db.topics.insert({
	"topicName": "Control of Nuclear Weapon",
	"username": "saber",
	"side": "Right"
});
db.topics.insert({
	"topicName": "US Russia Relationship",
	"username": "saber",
	"side": "Neutral"
});
db.topics.insert({
	"topicName": "Tax Cut Policy",
	"username": "caster",
	"side": "Neutral"
});
db.topics.insert({
	"topicName": "Control of Nuclear Weapon",
	"username": "caster",
	"side": "Right"
});
db.topics.insert({
	"topicName": "US Russia Relationship",
	"username": "caster",
	"side": "Left"
});
/////topics Lists
db.topicsList.insert({
	"topicName": "US Russia Relationship",
	"choices": [
		"Left",
		"Neutral",
		"Right"
	]
});
db.topicsList.insert({
	"topicName": "Control of Nuclear Weapon",
	"choices": [
		"Left",
		"Neutral",
		"Right"
	]
});
db.topicsList.insert({
	"topicName": "Tax Cut Policy",
	"choices": [
		"Left",
		"Neutral",
		"Right"
	]
});

//////news
db.news.insert({
	"src": "/images/sands-of-life.jpg",
	"title" : "NY Times",
	"link" : "https://www.nytimes.com/",
	"bias_score" : 10
});
db.news.insert({
	"src": "/images/sands-of-life.jpg",
	"title" : "WSJ",
	"link" : "https://www.wsj.com/",
	"bias_score" : -10
});
db.news.insert({
	"src": "/images/sands-of-life.jpg",
	"title" : "Reddit",
	"link" : "https://www.reddit.com/",
	"bias_score" : 0
});
