from app import app
from flask import jsonify, request
from models.main import *
from middleware.auth import login_required


@app.route("/api/subs/<string:permalink>")
def subs_item(permalink: str):
    sub = Sub.objects(permalink__iexact=permalink).first()

    if not sub:
        return jsonify({"error": "Sub not found"}), 404

    return jsonify(sub.to_public_json())


@app.route("/api/subs/<string:permalink>/posts")
def subs_posts(permalink: str):
    sub = Sub.objects(permalink__iexact=permalink).first()

    if not sub:
        return jsonify({"error": "Sub not found"}), 404

    posts = Post.objects(sub=sub)
    return jsonify([post.to_public_json() for post in posts])


@app.route("/api/subs", methods=["POST"])
@login_required
def subs_create(username: str):
    if not request.json:
        return jsonify({"error": "Data not specified"}), 409
    if not request.json.get("name"):
        return jsonify({"error": "Name not specified"}), 409
    if not request.json.get("description"):
        return jsonify({"error": "Description not specified"}), 409

    moderators = []
    for i in request.json.get("moderators").split(","):
        moderator = User.objects(username__iexact=i.strip()).first()
        if moderator:
            moderators.append(moderator)
        else:
            return jsonify({"error": f"Moderator '{i.strip()}' not found"}), 409

    permalink = request.json.get("name")\
        .lower()\
        .replace(" ", "-")\
        .replace(".", "")\
        .replace(",", "")\
        .replace("!", "")\
        .replace("?", "")

    if Sub.objects(permalink=permalink):
        return jsonify({"error": f"There is already a sub called '{permalink}'"}), 409

    sub = Sub(
        name=request.json.get("name"),
        description=request.json.get("description"),
        moderators=moderators,
        permalink=permalink
    ).save()

    return jsonify(sub.to_public_json())


@app.route("/api/subs/<string:permalink>/subscribe", methods=["POST"])
@login_required
def subs_subscribe(username: str, permalink: str):
    user = User.objects(username=username).first()
    sub = Sub.objects(permalink__iexact=permalink).first()

    if sub not in user.subscribed:
        user.subscribed.append(sub)
        # Sort subs by permalink
        user.subscribed = sorted(user.subscribed, key=lambda k: k["permalink"])

    user.save()

    return jsonify({
        "subscribed": [sub.to_public_json() for sub in user.subscribed]
    })


@app.route("/api/subs/<string:permalink>/unsubscribe", methods=["POST"])
@login_required
def subs_unsubscribe(username: str, permalink: str):
    user = User.objects(username=username).first()
    sub = Sub.objects(permalink__iexact=permalink).first()

    if sub in user.subscribed:
        subscribed_index = user.subscribed.index(sub)
        user.subscribed.pop(subscribed_index)

    user.save()

    return jsonify({
        "subscribed": [sub.to_public_json() for sub in user.subscribed]
    })
