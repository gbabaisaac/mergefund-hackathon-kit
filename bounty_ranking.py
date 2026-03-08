import json

bounties = [
    {"id": 1, "amount": 500, "difficulty": 3, "time_remaining": 10},
    {"id": 2, "amount": 300, "difficulty": 2, "time_remaining": 5},
    {"id": 3, "amount": 800, "difficulty": 5, "time_remaining": 7},
    {"id": 4, "amount": 150, "difficulty": 1, "time_remaining": 20}
]

# 评分逻辑
def calculate_score(bounty):
    return (bounty["amount"] * 0.5) + (bounty["difficulty"] * 2) + (bounty["time_remaining"] * 0.1)

# 计算并排序
for bounty in bounties:
    bounty["score"] = calculate_score(bounty)

bounties_sorted = sorted(bounties, key=lambda x: x["score"], reverse=True)

# 输出结果
for bounty in bounties_sorted:
    print(f"Bounty ID: {bounty['id']}, Score: {bounty['score']}")

result = json.dumps(bounties_sorted, indent=4)