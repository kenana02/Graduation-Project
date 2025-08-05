import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSavedItems } from '../context/SavedItemsContext';

const dummyProduct = {
  id: '1',
  name: 'Apple Iphone 16 pro Max',
  screen: '6.3″',
  sim: 'Dual SIM',
  price: '$1,399',
  image: require('../assets/images/iphone1.jpg'),
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { savedItems, toggleSave } = useSavedItems();

  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);

  const handleLike = () => setLiked(!liked);
  const handleSave = () => toggleSave(dummyProduct);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, { text: comment, replies: [] }]);
      setComment('');
      setShowCommentBox(false);
    }
  };

  const handleReply = (index) => {
    if (replyText.trim()) {
      const updated = [...comments];
      updated[index].replies.push(replyText);
      setComments(updated);
      setReplyText('');
      setReplyIndex(null);
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setSelectedStars(star)}>
            <FontAwesome
              name={star <= selectedStars ? 'star' : 'star-o'}
              size={32}
              color="#234ED5"
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#234ED5" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>تفاصيل المنتج</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.productCard}>
          <Image source={dummyProduct.image} style={styles.productImage} />
          <Text style={styles.productName}>{dummyProduct.name}</Text>
          <Text style={styles.detail}>🖥️ حجم الشاشة: {dummyProduct.screen}</Text>
          <Text style={styles.detail}>📶 عدد الشرائح: {dummyProduct.sim}</Text>
          <Text style={styles.price}>{dummyProduct.price}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? '#234ED5' : '#999'}
            />
            <Text style={styles.actionLabel}>إعجاب</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowCommentBox(!showCommentBox)}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#234ED5" />
            <Text style={styles.actionLabel}>تعليق</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSave}>
            <FontAwesome
              name={savedItems.some(el => el.id === dummyProduct.id) ? 'bookmark' : 'bookmark-o'}
              size={22}
              color="#234ED5"
            />
            <Text style={styles.actionLabel}>حفظ</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowReviewModal(true)}>
            <FontAwesome name="star" size={22} color="#234ED5" />
            <Text style={styles.actionLabel}>تقييم</Text>
          </TouchableOpacity>
        </View>

        {/* تعليق */}
        {showCommentBox && (
          <View style={styles.commentBox}>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="اكتب تعليقك هنا"
              style={styles.commentInput}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <Text style={styles.sendText}>إرسال</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* عرض التعليقات والردود */}
        {comments.map((c, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentText}>💬 {c.text}</Text>
            <TouchableOpacity onPress={() => setReplyIndex(index)}>
              <Text style={styles.replyButton}>رد</Text>
            </TouchableOpacity>

            {/* مربع الرد */}
            {replyIndex === index && (
              <View style={styles.replyBox}>
                <TextInput
                  value={replyText}
                  onChangeText={setReplyText}
                  placeholder="اكتب ردك"
                  style={styles.replyInput}
                />
                <TouchableOpacity onPress={() => handleReply(index)}>
                  <Text style={styles.sendReply}>إرسال</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* الردود */}
            {c.replies.map((r, i) => (
              <Text key={i} style={styles.replyText}>↪️ {r}</Text>
            ))}
          </View>
        ))}

        {/* Modal التقييم */}
        <Modal
          visible={showReviewModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>اختر التقييم:</Text>
              {renderStars()}
              <TouchableOpacity onPress={() => setShowReviewModal(false)} style={styles.closeBtn}>
                <Text style={{ color: 'white' }}>تم</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18, color: '#234ED5', fontWeight: 'bold',
  },
  productCard: {
    alignItems: 'center', backgroundColor: '#F4F4F4', margin: 20, borderRadius: 10, padding: 16,
  },
  productImage: { width: 150, height: 200, resizeMode: 'contain' },
  productName: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  detail: { fontSize: 14, color: '#333', marginVertical: 4 },
  price: { fontSize: 16, color: 'green', fontWeight: 'bold', marginTop: 10 },
  actions: {
    flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginVertical: 20,
  },
  actionLabel: { fontSize: 12, color: '#234ED5', textAlign: 'center', marginTop: 4 },
  commentBox: {
    marginHorizontal: 20, backgroundColor: '#eee', borderRadius: 10, padding: 10,
  },
  commentInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, height: 80, textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#234ED5', padding: 8, borderRadius: 8, alignSelf: 'flex-start', marginTop: 10,
  },
  sendText: { color: 'white' },
  commentItem: {
    marginHorizontal: 20, marginTop: 12, backgroundColor: '#f8f8f8', padding: 10, borderRadius: 10,
  },
  commentText: { fontSize: 14, marginBottom: 5 },
  replyButton: { color: '#234ED5', fontSize: 13 },
  replyBox: { marginTop: 6 },
  replyInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 8, height: 60,
    textAlignVertical: 'top', backgroundColor: '#fff',
  },
  sendReply: {
    marginTop: 6, backgroundColor: '#234ED5', color: 'white', padding: 6, borderRadius: 6, width: 60, textAlign: 'center',
  },
  replyText: {
    marginTop: 6, marginStart: 12, fontSize: 13, color: '#444',
  },
  modalBackground: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center', width: '80%',
  },
  modalTitle: { fontSize: 16, marginBottom: 12, color: '#234ED5' },
  starRow: { flexDirection: 'row', marginVertical: 10 },
  closeBtn: {
    marginTop: 20, backgroundColor: '#234ED5', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 6,
  },
});
