<?php
/**
*data_model.php
*数据操作文件
* @category    models
* @author      xqguo
*/
	class Data_model extends CI_Model{
		
		/**
		 *取菜单sql语句
		 */
		 
		 public function _get_menu($array2){
			$array1=array('classid','menu_name');	//字段
			$sql = $this->db->select($array1)
									->from('u_c_menu')
									->where($array2)
									->order_by('menu_order'.' asc')
									->get();
			return $sql->result();
		 }
		 
		/**
		 *取导航菜单
		 *
		 * @access public
		 * @return string
		 */
		public function get_Menu(){
			$data = $this->_get_menu(array('level'=>1));
			return $data;
		}
		
		/**
		 *取二级菜单
		 *
		 * @access public
		 * @return string
		 */
		public function get_B_Menu($id){
			$array2=array('level'=>2,'parentid'=>$id);
			$data = $this->_get_menu($array2);
			return $data;
		}
		
		/**
		 *新闻列表sql语句
		 *
		 * @access public
		 * @return string
		 */
		public function _get_newsList($arra1,$array2,$offset,$num){
			$sql = $this->db->select($arra1)
									->from('u_m_article')
									->where($array2)
									->order_by('create_time'.' desc')
									->limit($num,$offset)
									->get();
			return $sql->result();
		}
		
		/**
		 *特定条件的元组数目
		 *
		 * @access public
		 * @return int
		 */
		public function _get_num($table,$array){
			$res = $this->db->where($array)->get($table);
			return $res->num_rows();
		}
		
		/**
		 *取新闻列表
		 *
		 * @access public
		 * @return string
		 */
		public function get_NewsList($catid,$offset,$num){
			$array1 = array('id','create_time','article_title');
			
			//判断新闻所属栏目
			if(!empty($catid)){
				$array2 = array('article_menu'=>$catid,'is_issue'=>'是');
			}else{
				$array2 = array('is_issue'=>'是');
			}
			
			$data = $this->_get_newsList($array1,$array2,$offset,$num);
			//格式化日期
			foreach($data as $key=>$value){
				$data[$key]->create_time = date('Y-m-d',$data[$key]->create_time);
			}
			
			$data['num']  = $this->_get_num('u_m_article',$array2);	//获取新闻总数
			$data['page']=intval($data['num']/$num)+1;		//总共页数
			$data['page_num']=$num;		//每页显示条数
			
			return $data;
		}
		
		/**
		 *文章sql
		 *
		 * @access public
		 * @return string
		 */
		 public function _get_article($id){
			$sql='select  a.create_time,a.article_title,a.article_from,a.article_click,a.article_content,b.username,c.parentid,c.level,c.menu_name from gjxy_u_m_article as a,gjxy_admins as b,gjxy_u_c_menu as c where a.article_menu=c.classid and a.create_user = b.uid and a.is_issue = "是" and a.id='.$id;
			$data = $this->db->query($sql);
			return $data->result();
		 }
		 
		 /**
		 *新闻内容
		 *
		 * @access public
		 * @return string
		 */
		 public function get_Article($id){
			$data = $this->_get_article($id);
			foreach($data as $key=>$value){
				$data[$key]->create_time = date('Y年m月d日',$data[$key]->create_time);	//格式化日期
				if($data[$key]->parentid !=0 && $data[$key]->level !=1){	//所属栏目不是一级菜单时
					$Bmenu= $this->get_B_Menu($data[$key]->parentid);	//获取二级菜单栏目
					$data['Bmenu']=$Bmenu;
				}
				
				$this->_update_article_click($data[$key]->article_click,null,$id);		//更新文章浏览量
			}
			return $data;
		 }
		 
		 /**
		 *栏目内容sql
		 *
		 * @access public
		 * @return string
		 */
		 public function _get_content($catid){
			$sql='select  a.create_time,a.article_title,a.article_from,a.article_click,a.article_content,b.username,c.parentid,c.level,c.menu_name from gjxy_u_m_article as a,gjxy_admins as b,gjxy_u_c_menu as c where a.article_menu='.$catid.' and a.create_user = b.uid and a.is_issue = "是" and c.classid='.$catid;
			$data = $this->db->query($sql);
			return $data->result();
		 }
		 
		  /**
		 *栏目内容
		 *
		 * @access public
		 * @return string
		 */
		 public function get_Content($catid){
			$data = $this->_get_content($catid);
			foreach($data as $key=>$value){
				$data[$key]->create_time = date('Y年m月d日',$data[$key]->create_time);	//格式化日期
				if($data[$key]->parentid !=0 && $data[$key]->level !=1){	//所属栏目不是一级菜单时
					$Bmenu= $this->get_B_Menu($data[$key]->parentid);	//获取二级菜单栏目
					$data['Bmenu']=$Bmenu;
				}
				
				$this->_update_article_click($data[$key]->article_click,$catid);		//更新文章浏览量
			}
			return $data;
		 }
		 
		 /**
		 *更新浏览量
		 *
		 * @access public
		 * @return void
		 */
		 public function _update_article_click($click,$catid=null,$id=null){
			$click++;
			if(!empty($catid) && empty($id)){
				$sql = 'update gjxy_u_m_article set article_click='.$click.' where article_menu='.$catid.' and is_issue="是"';
			}else{
				$sql = 'update gjxy_u_m_article set article_click='.$click.' where id='.$id.' and is_issue="是"';
			}
			
			$this->db->query($sql);
		 }
	}