import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Text, Avatar, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  screen?: string;
  action?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose, navigation }) => {
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'view-dashboard',
      screen: 'Dashboard'
    },
    {
      id: 'weather',
      title: 'Weather',
      icon: 'weather-cloudy',
      screen: 'WeatherInfo'
    },
    {
      id: 'crop',
      title: 'Crop Prediction',
      icon: 'sprout',
      screen: 'CropRecommendation'
    },
    {
      id: 'disease',
      title: 'Disease Detection',
      icon: 'camera-plus',
      screen: 'DiseaseDetection'
    },
    {
      id: 'assistant',
      title: 'AI Assistant',
      icon: 'robot',
      screen: 'Chatbot'
    },
    {
      id: 'calendar',
      title: 'Crop Calendar',
      icon: 'calendar',
      screen: 'CropCalendar'
    },
    {
      id: 'community',
      title: 'Community',
      icon: 'account-group',
      // Coming soon - no screen yet
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'cog',
      screen: 'Settings'
    }
  ];

  const handleMenuPress = (item: MenuItem) => {
    onClose();
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.action) {
      item.action();
    }
    // For items without screen/action, they're coming soon features
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouch} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <View style={styles.sidebar}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Avatar.Icon 
              size={60} 
              icon="account" 
              style={styles.avatar}
              theme={{ colors: { primary: '#4CAF50' } }}
            />
            <Text style={styles.profileName}>CropAI Assistant</Text>
            <Text style={styles.profileSubtitle}>Smart farming solutions</Text>
          </View>

          <Divider style={styles.divider} />

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color="#666"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
                {!item.screen && !item.action && (
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonText}>Soon</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0</Text>
            <Text style={styles.footerSubtext}>Made with ❤️ for farmers</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouch: {
    flex: 1,
  },
  sidebar: {
    width: width * 0.75,
    maxWidth: 300,
    backgroundColor: 'white',
    paddingTop: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  comingSoonBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  comingSoonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#999',
  },
});

export default Sidebar;
