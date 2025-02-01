import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons"; // For audio, like, and comment icons
import { Video, Audio } from "expo-av";
import Icon from 'react-native-vector-icons/FontAwesome';

const PostCard = ({ post }) => {
    const { type, location, description, imageFiles, videoFile, audioFile, comments, like, dislike } = post;

    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [currentLikes, setCurrentLikes] = useState(like);
    const [currentDislikes, setCurrentDislikes] = useState(dislike); // Initialize with post dislike count
    const [commentList, setCommentList] = useState(comments);
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false); // State for tracking dislikes

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync({ uri: audioFile });
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                setIsPlaying(false);
                sound.unloadAsync();
            }
        });
    };

    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(undefined);
            setIsPlaying(false);
        }
    };

    const handleCommentSubmit = () => {
        if (newComment) {
            setCommentList([...commentList, newComment]);
            setNewComment("");
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <View style={styles.card}>
            {/* Incident Type and Location */}
            <View style={styles.header}>
                <Text style={styles.type}>{type}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>

            {/* Media (Image, Video, or Audio) */}
            {imageFiles.length > 0 && (
                imageFiles.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: img }}
                        style={styles.image}
                    />
                ))
            )}

            {videoFile && (
                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: videoFile }}
                        useNativeControls
                        resizeMode="contain"
                        style={styles.video}
                    />
                </View>
            )}

            {audioFile && (
                <View style={styles.audioContainer}>
                    <Feather name="mic" size={24} color="black" />
                    <TouchableOpacity style={styles.audioButton} onPress={isPlaying ? stopAudio : playAudio}>
                        <Text style={styles.audioText}>{isPlaying ? "Stop Audio" : "Play Audio"}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.description}>{description}</Text>

            {/* Like and Dislike Section */}
            <View style={styles.actions}>
                {/* Like Button (Upward Arrow) */}
                <TouchableOpacity
                    onPress={() => {
                        if (isLiked) {
                            setCurrentLikes(currentLikes - 1);
                        } else {
                            setCurrentLikes(currentLikes + 1);
                        }
                        setIsLiked(!isLiked);
                    }}
                    style={styles.actionButton}
                >
                    <Icon name="arrow-up" size={24} color={isLiked ? "#fb923c" : "gray"} />
                    <Text style={styles.actionText}>{currentLikes}</Text>
                </TouchableOpacity>

                {/* Dislike Button (Downward Arrow) */}
                <TouchableOpacity
                    onPress={() => {
                        if (isDisliked) {
                            setCurrentDislikes(currentDislikes - 1);
                        } else {
                            setCurrentDislikes(currentDislikes + 1);
                        }
                        setIsDisliked(!isDisliked);
                    }}
                    style={styles.actionButton}
                >
                    <Icon name="arrow-down" size={24} color={isDisliked ? "blue" : "gray"} />
                    <Text style={styles.actionText}>{currentDislikes}</Text>
                </TouchableOpacity>

                {/* Comment Button */}
                <TouchableOpacity onPress={toggleComments} style={styles.actionButton}>
                    <Feather name="message-circle" size={24} color="gray" />
                    <Text style={styles.actionText}>{commentList.length}</Text>
                </TouchableOpacity>
            </View>

            {/* Comments Section */}
            {showComments && (
                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>Comments:</Text>
                    {commentList.length > 0 ? (
                        commentList.map((comment, index) => (
                            <Text key={index} style={styles.comment}>- {comment}</Text>
                        ))
                    ) : (
                        <Text style={styles.noComments}>No comments yet.</Text>
                    )}

                    {/* Comment Input */}
                    <TextInput
                        placeholder="Add a comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                        style={styles.commentInput}
                    />
                    <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    location: {
        color: '#6B7280', // gray-500
        fontSize: 14,
    },
    image: {
        height: 160,
        width: '100%',
        borderRadius: 8,
        marginBottom: 16,
    },
    videoContainer: {
        height: 160,
        width: '100%',
        borderRadius: 8,
        marginBottom: 16,
    },
    video: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6', // gray-100
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    audioButton: {
        marginLeft: 16,
    },
    audioText: {
        color: '#3B82F6', // blue-500
    },
    description: {
        color: '#374151', // gray-700
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 8,
    },
    commentsSection: {
        marginTop: 16,
    },
    commentsTitle: {
        fontWeight: 'bold',
    },
    comment: {
        color: '#4B5563', // gray-600
    },
    noComments: {
        color: '#4B5563', // gray-600
    },
    commentInput: {
        borderColor: '#D1D5DB', // gray-300
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
    },
    submitButton: {
        backgroundColor: '#3B82F6', // blue-500
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default PostCard;